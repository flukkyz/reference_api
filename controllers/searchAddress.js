const db = require('../models')
const wordcut = require("wordcut");
const District = db.District
const Amphure = db.Amphure
const Province = db.Province
const Op = db.Sequelize.Op;
const QueryTypes = db.Sequelize.QueryTypes;

const swapLangText = (str) => {
  const charFrom = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', 'ๅ', '/', '-', 'ภ', 'ถ', 'ุ', 'ึ', 'ค', 'ต', 'จ', 'ข', 'ช', 'ๆ', 'ไ', 'ำ', 'พ', 'ะ', 'ั', 'ี', 'ร', 'น', 'ย', 'บ', 'ล', 'ฃ', 'ฟ', 'ห', 'ก', 'ด', 'เ', '้', '่', 'า', 'ส', 'ว', 'ง', 'ผ', 'ป', 'แ', 'อ', 'ิ', 'ื', 'ท', 'ม', 'ใ', 'ฝ', '+', '๑', '๒', '๓', '๔', 'ู', '฿', '๕', '๖', '๗', '๘', '๙', '๐', '"', 'ฎ', 'ฑ', 'ธ', 'ํ', '๊', 'ณ', 'ฯ', 'ญ', 'ฐ', ',', 'ฅ', 'ฤ', 'ฆ', 'ฏ', 'โ', 'ฌ', '็', '๋', 'ษ', 'ศ', 'ซ', '.', '(', ')', 'ฉ', 'ฮ', 'ฺ', '์', '?', 'ฒ', 'ฬ', 'ฦ']
  const charTo = ['ๅ', '/', '-', 'ภ', 'ถ', 'ุ', 'ึ', 'ค', 'ต', 'จ', 'ข', 'ช', 'ๆ', 'ไ', 'ำ', 'พ', 'ะ', 'ั', 'ี', 'ร', 'น', 'ย', 'บ', 'ล', 'ฃ', 'ฟ', 'ห', 'ก', 'ด', 'เ', '้', '่', 'า', 'ส', 'ว', 'ง', 'ผ', 'ป', 'แ', 'อ', 'ิ', 'ื', 'ท', 'ม', 'ใ', 'ฝ', '+', '๑', '๒', '๓', '๔', 'ู', '฿', '๕', '๖', '๗', '๘', '๙', '๐', '"', 'ฎ', 'ฑ', 'ธ', 'ํ', '๊', 'ณ', 'ฯ', 'ญ', 'ฐ', ',', 'ฅ', 'ฤ', 'ฆ', 'ฏ', 'โ', 'ฌ', '็', '๋', 'ษ', 'ศ', 'ซ', '.', '(', ')', 'ฉ', 'ฮ', 'ฺ', '์', '?', 'ฒ', 'ฬ', 'ฦ', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?']
  let newStr = ''
  for (let i = 0; i < str.length; i++) {
    const char = str.charAt(i)
    if (char !== ' ') {
      const indexFrom = charFrom.indexOf(char)
      if (indexFrom !== -1) {
        newStr += charTo[indexFrom]
      }
    } else {
      newStr += ' '
    }
  }
  return newStr
}

module.exports = {
  index: async (req, res) => {
    const { q, size } = req.query
    if(q && q !== ''){
      wordcut.init(__dirname + '/../resources/dictionary.txt');
      const cut = wordcut.cut(`${q} ${swapLangText(q)}`)
      const cutLists = cut.split('|').filter(ele => ele.trim() !== '').map(ele => ele.trim())

      const bindVal = {
        qe: q,
        ql: `%${q}%`,
      }

      let order = ` order by (
                  (CASE WHEN districts.name_th = $qe THEN 20 WHEN districts.name_th like $ql THEN 13 else 0 END) + 
                  (CASE WHEN districts.name_en = $qe THEN 19 WHEN districts.name_en like $ql THEN 12 else 0 END) + 
                  (CASE WHEN districts.zip_code = $qe THEN 19 WHEN districts.zip_code like $ql THEN 12 else 0 END) + 
                  (CASE WHEN amphures.name_th = $qe THEN 19 WHEN amphures.name_th like $ql THEN 12 else 0 END) +  
                  (CASE WHEN amphures.name_en = $qe THEN 18 WHEN amphures.name_en like $ql THEN 11 else 0 END) +  
                  (CASE WHEN provinces.name_th = $qe THEN 18 WHEN provinces.name_th like $ql THEN 11 else 0 END) +  
                  (CASE WHEN provinces.name_en = $qe THEN 17 WHEN provinces.name_en like $ql THEN 10 else 0 END)`

      const limit = ` limit ${size && !isNaN(size) ? size : '50'}`

      let sql = `select 
                districts.id as district_id,
                amphures.id as amphure_id,
                provinces.id as province_id,
                districts.name_th as district_th,
                districts.name_en as district_en,
                amphures.name_th as amphure_th,
                amphures.name_en as amphure_en,
                provinces.name_th as province_th,
                provinces.name_en as province_en,
                geographies.name_th as geography_th,
                geographies.name_en as geography_en,
                districts.zip_code,
                amphures.code as amphure_code,
                provinces.code as province_code,
                IF(provinces.code = 10,'แขวง', 'ต.') as district_short_prefix,
                IF(provinces.code = 10, '', 'อ.') as amphure_short_prefix,
                IF(provinces.code = 10, '', 'จ.') as province_short_prefix,
                IF(provinces.code = 10,'แขวง', 'ตำบล') as district_prefix,
                IF(provinces.code = 10, '', 'อำเภอ') as amphure_prefix,
                IF(provinces.code = 10, '', 'จังหวัด') as province_prefix,
                CONCAT(
                  IF(provinces.code = 10,'แขวง', 'ต.'),
                  districts.name_th,
                  IF(provinces.code = 10, ' ', ' อ.'),
                  amphures.name_th,
                  IF(provinces.code = 10, ' ', ' จ.'),
                  provinces.name_th
                ) as short_th,
                CONCAT(
                  districts.name_en,
                  ', ',
                  amphures.name_en,
                  ', ',
                  provinces.name_en
                ) as short_en,
                CONCAT(
                  IF(provinces.code = 10,'แขวง', 'ต.'),
                  districts.name_th,
                  IF(provinces.code = 10, ' ', ' อ.'),
                  amphures.name_th,
                  IF(provinces.code = 10, ' ', ' จ.'),
                  provinces.name_th,
                  ' ',
                  districts.zip_code
                ) as medium_th,
                CONCAT(
                  districts.name_en,
                  ', ',
                  amphures.name_en,
                  ', ',
                  provinces.name_en,
                  ' ',
                  districts.zip_code
                ) as medium_en,
                CONCAT(
                  IF(provinces.code = 10,'แขวง', 'ตำบล'),
                  districts.name_th,
                  IF(provinces.code = 10, ' ', ' อำเภอ'),
                  amphures.name_th,
                  IF(provinces.code = 10, ' ', ' จังหวัด'),
                  provinces.name_th
                ) as long_th,
                CONCAT(
                  districts.name_en,
                  IF(provinces.code = 10,', ', ' sub-district, '),
                  amphures.name_en,
                  IF(provinces.code = 10,', ', ' district, '),
                  provinces.name_en
                ) as long_en,
                CONCAT(
                  IF(provinces.code = 10,'แขวง', 'ตำบล'),
                  districts.name_th,
                  IF(provinces.code = 10, ' ', ' อำเภอ'),
                  amphures.name_th,
                  IF(provinces.code = 10, ' ', ' จังหวัด'),
                  provinces.name_th,
                  ' ',
                  districts.zip_code
                ) as full_th,
                CONCAT(
                  districts.name_en,
                  IF(provinces.code = 10,', ', ' sub-district, '),
                  amphures.name_en,
                  IF(provinces.code = 10,', ', ' district, '),
                  provinces.name_en,
                  ' ',
                  districts.zip_code
                ) as full_en
                from 
                districts
                INNER JOIN amphures 
                  ON districts.amphure_id = amphures.id
                INNER JOIN provinces 
                  ON amphures.province_id = provinces.id
                INNER JOIN geographies 
                  ON provinces.geography_id = geographies.id
                where 
                  districts.name_th like $ql or 
                  districts.name_en like $ql or 
                  districts.zip_code like $ql or 
                  amphures.name_th like $ql or 
                  amphures.name_en like $ql or 
                  provinces.name_th like $ql or 
                  provinces.name_en like $ql `
      
      if(cutLists.length > 1){
        cutLists.forEach((ele, i) => {
          sql += ` or districts.name_th like $qsl${i} 
                or districts.name_en like $qsl${i} 
                or districts.zip_code like $qsl${i} 
                or amphures.name_th like $qsl${i} 
                or amphures.name_en like $qsl${i} 
                or provinces.name_th like $qsl${i} 
                or provinces.name_en like $qsl${i} `
          order += ` + (CASE WHEN districts.name_th = $qse${i} THEN 7 WHEN districts.name_th like $qsl${i} THEN 4 else 0 END) 
                  + (CASE WHEN districts.name_en = $qse${i} THEN 6 WHEN districts.name_en like $qsl${i} THEN 3 else 0 END) 
                  + (CASE WHEN districts.zip_code = $qse${i} THEN 6 WHEN districts.zip_code like $qsl${i} THEN 3 else 0 END) 
                  + (CASE WHEN amphures.name_th = $qse${i} THEN 6 WHEN amphures.name_th like $qsl${i} THEN 3 else 0 END) 
                  + (CASE WHEN amphures.name_en = $qse${i} THEN 5 WHEN amphures.name_en like $qsl${i} THEN 2 else 0 END) 
                  + (CASE WHEN provinces.name_th = $qse${i} THEN 5 WHEN provinces.name_th like $qsl${i} THEN 2 else 0 END) 
                  + (CASE WHEN provinces.name_en = $qse${i} THEN 4 WHEN provinces.name_en like $qsl${i} THEN 1 else 0 END)`
          bindVal[`qse${i}`] = ele
          bindVal[`qsl${i}`] = `%${ele}%`
        })
      }
      order += ') DESC '
      sql += order
      sql += limit


      const query = await db.sequelize.query(sql,{
        bind: bindVal,
        type: QueryTypes.SELECT
      })
      return res.json(query)
    }
    return res.json([])
  }
}
