const PDFMerger = require('pdf-merger-js');
const fs = require('fs')
const path = require('path')

const filesDir = path.resolve(__dirname, './file')
const files = fs.readdirSync(filesDir)

const DS_StoreIndex = files.findIndex(i => i === '.DS_Store')
if (DS_StoreIndex > -1) files.splice(DS_StoreIndex, 1)

const merger = new PDFMerger();
const destName = 'SoonSpace 功能说明书.pdf';
const outputPath = `./.vuepress/public/resource/离线功能说明书/${destName}`

/**
 * 比较前后俩个纯数字数组是否需要反转
 * @param  {Array<Number>} before
 * @param  {Array<Number>} after
 * @return {boolean}
 */
function isNeedReverse(before, after) {
  let res = false

  const length = Math.max(before.length, after.length)

  for (let i = 0; i < length; i++) {
    if (!before[i]) {
      res = false
      break
    } else if (!after[i]) {
      res = true
      break
    } else if (after[i] < before[i]) {
      res = true
      break
    } else if (after[i] > before[i]) {
      res = false
      break
    }
  }

  return res
}

function sortFile(files) {

  const sortDataArr = files.map((item, dataIndex) => ({
    indexs: item.split(' ')[0].split('.').map(i => Number(i)),
    dataIndex
  }))


  for (let i = 0; i < sortDataArr.length - 1; i++) {
    for (let j = i + 1; j < sortDataArr.length - i; j++) {
      if (isNeedReverse(sortDataArr[i].indexs, sortDataArr[j].indexs)) {
        [sortDataArr[i], sortDataArr[j]] = [sortDataArr[j], sortDataArr[i]]
      }
    }
  }

  return sortDataArr.map(item => files[item.dataIndex])
}

(async () => {
  const newFiles = sortFile(files)

  for (let i in newFiles) {
    merger.add(path.resolve(__dirname, `./file/${newFiles[i]}`));
  }
  await merger.save(outputPath);
})();
