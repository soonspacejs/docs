const PDFMerger = require('pdf-merger-js');
const fs = require('fs')
const path = require('path')

const filesDir = path.resolve(__dirname, './file')
const files = fs.readdirSync(filesDir)

const DS_StoreIndex = files.findIndex(i => i === '.DS_Store')
if (DS_StoreIndex > -1) files.splice(DS_StoreIndex, 1)

const merger = new PDFMerger();
const destName = 'SoonSpace 功能说明书.pdf';

function afterMinBefore(before, after) {
  let res = false

  const length = after.length > before.length ? after.length : before.length

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

function resort(files) {

  const sortDataArr = []

  for (let i in files) {
    const iIndex = files[i].split(' ')[0]

    sortDataArr.push({
      key: iIndex,
      indexs: iIndex.split('.').map(i => Number(i)),
      dataIndex: i
    })
  }

  for (let i = 0; i < sortDataArr.length - 1; i++) {
    for (let j = 0; j < sortDataArr.length - i - 1; j++) {
      if (afterMinBefore(sortDataArr[j].indexs, sortDataArr[j + 1].indexs)) {
        const temp = sortDataArr[j]
        sortDataArr[j] = sortDataArr[j + 1]
        sortDataArr[j + 1] = temp
      }
    }

  }

  return sortDataArr.map(i => files[i.dataIndex])
}

(async () => {
  const newFiles = resort(files)

  for (let i in newFiles) {
    merger.add(path.resolve(__dirname, `./file/${newFiles[i]}`));
  }
  await merger.save(`./.vuepress/public/resource/离线功能说明书/${destName}`);
})();
