const XLSX = require('xlsx');

const data = [];
let baseTime = new Date('2024-05-01T08:00:00Z').getTime();

// Initial strokes
let sA = 100, sB = 100, sC = 100, sD = 100;

for (let i = 0; i < 200; i++) {
  let speed = 40; // Boring
  if (i >= 50 && i < 100) {
    // Ring fixing!
    speed = 0;
    // Retract group A
    sA = 20;
    // Others holding
    sB = 1600; sC = 1600; sD = 1600;
  } else if (i >= 150 && i < 170) {
    // Another short fix, let's say Group C
    speed = 0;
    sA = 1800; sB = 1800; sD = 1800;
    sC = 150;
  } else {
    // Normal boring, advancing
    sA += 10; sB += 10; sC += 10; sD += 10;
  }

  data.push({
    '日期': new Date(baseTime + i * 60000).toISOString(),
    '外循环水箱补水流量': 15.5,
    '刀盘速度': 2.5,
    '刀盘转矩': 3500,
    '总推进力': 25000,
    '贯入度': 12,
    '推进速度平均值': speed,
    'A组主推进油缸行程': sA,
    'B组主推进油缸行程': sB,
    'C组主推进油缸行程': sC,
    'D组主推进油缸行程': sD,
    '辅助推进泵出口压力': 150,
    'A组油缸辅助推进压力': 160,
    'B组油缸辅助推进压力': 160,
    'C组油缸辅助推进压力': 160,
    'D组油缸辅助推进压力': 160,
  });
}

const ws = XLSX.utils.json_to_sheet(data);
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
XLSX.writeFile(wb, "mock_tbm_data.xlsx");
console.log("mock_tbm_data.xlsx generated!");
