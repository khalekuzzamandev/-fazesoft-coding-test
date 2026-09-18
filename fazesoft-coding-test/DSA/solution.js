 function jmNum(nums) {
  // initial value
  let maxnum = 0;

  for (let i = 0; i < nums.length; i++) {
    if (i > maxnum) {
      return false;
    }

    maxnum= Math.max(maxnum, i + nums[i]);

    if (maxnum >= nums.length - 1) {
      return true;
    }
  }

  return true;
}
console.log(jmNum([-32,32323,4]));