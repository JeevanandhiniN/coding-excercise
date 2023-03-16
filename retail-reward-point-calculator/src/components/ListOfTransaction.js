import {useState, useEffect} from 'react';
import axios from 'axios';
import getRewardPointForAmount from '../util/rewardsCalcUtil';

function ListOfTransaction()  {

  const today = new Date();
  const [transInfo, setTransInfo] = useState([]);
  const [custInfo, setCustInfo] = useState([]);
  const [monthSelected, setMonthSelected] = useState(today.getMonth()+1);

  useEffect(()=>{
    calculateMonthlyCustomerReward();
  },[])

  function  getCustomerTransactionData(custId) {
    return  axios.get(`http://localhost:3004/transactions?custId=${custId}`)

  }

  function getCustomerInfo() {
    return axios.get(`http://localhost:3004/customers`)

  }

  async function calculateMonthlyCustomerReward() {
    let resCustInfo = await getCustomerInfo();
    resCustInfo = resCustInfo.data;
    console.log('customer');
    console.log(resCustInfo);

    for(let cust of resCustInfo) {
      let resTransInfo = await getCustomerTransactionData(cust.custId);
      resTransInfo = resTransInfo.data;
      cust.totAmount = 0;
      cust.monthlyRewards = {};
      for(let trans of resTransInfo) {
        cust.totAmount += trans.amount;

        if (cust.monthlyRewards[trans.date.substr(0,2)] === undefined) {
          cust.monthlyRewards[trans.date.substr(0,2)] = trans.amount;
        } else {
          cust.monthlyRewards[trans.date.substr(0,2)]+=trans.amount;
        }
      }
    }
    setCustInfo(resCustInfo)
    console.log(custInfo);
  }

  const handleMonthSelected = (e) => {
    console.log(e.target.value);
    setMonthSelected(e.target.value);
  }

  console.log(monthSelected);

  return (
    <div>
    <div>
      <label>
      <p>Select the Month to Calculate Reward Points</p>
      <select value={monthSelected} onChange = {(e)=>{handleMonthSelected(e)}}>
        <option value='01'>January</option>
        <option value='02'>February</option>
        <option value='03'>March</option>
        <option value='04'>April</option>
        <option value='05'>May</option>
        <option value='06'>June</option>
        <option value='07'>July</option>
        <option value='08'>August</option>
        <option value='09'>September</option>
        <option value='10'>October</option>
        <option value='11'>November</option>
        <option value='12'>December</option>
      </select>
      </label>
      <div>
      <table>
      <thead>
        <tr>
          <th>CustomerId</th>
          <th>Name</th>
          <th>Total amount</th>
          <th>Total Rewards</th>
          <th>Rewards by selected month</th>
        </tr>
      </thead>
      <tbody>
      {custInfo.map((cust)=>{
        return (
          <tr key={cust.custId}>
            <td>{cust.custId}</td>
            <td>{`${cust.firstName} ${cust.lastName}`}</td>
            <td>{cust.totAmount}</td>
            <td>{getRewardPointForAmount(cust.totAmount)}</td>
            <td>{getRewardPointForAmount(cust.monthlyRewards[monthSelected])}</td>
          </tr>
        )
      })}
      </tbody>
    </table>
    </div>
    </div>
    </div>
  )
}



export default ListOfTransaction;