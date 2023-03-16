/**
 * @param {integer} transaction amount
 * @return reward in points
 */

function getRewardPointForAmount(amount) {
  let rewards;
  rewards = amount>100? ((amount - 100) * 2) + (50 * 1): ((amount > 50)?((amount-50)*1):0);
  return rewards;
}


export default getRewardPointForAmount;