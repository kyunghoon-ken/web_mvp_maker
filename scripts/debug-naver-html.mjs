/**
 * 네이버 시가총액 페이지 HTML 구조 디버깅
 * 크롤 결과가 0건일 때, 테이블/셀렉터가 맞는지 확인용.
 * 실행: npm run debug:html (scripts 폴더에서)
 */

import axios from 'axios';
import * as cheerio from 'cheerio';
import iconv from 'iconv-lite';
import { writeFileSync } from 'fs';

const url = 'https://finance.naver.com/sise/sise_market_sum.naver?&page=1';

async function main() {
  console.log('네이버 시가총액 페이지 다운로드 및 구조 확인...\n');

  const { data } = await axios.get(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    },
    responseType: 'arraybuffer',
  });

  const decodedHtml = iconv.decode(Buffer.from(data), 'euc-kr');
  const $ = cheerio.load(decodedHtml);

  // 테이블 존재 여부
  const $table = $('table.type_2');
  console.log('table.type_2 개수:', $table.length);

  const $rows = $('table.type_2 tbody tr');
  console.log('table.type_2 tbody tr 개수:', $rows.length);

  // a.tltle 있는 행 개수
  let withTltle = 0;
  $rows.each((i, el) => {
    if ($(el).find('a.tltle').length > 0) withTltle++;
  });
  console.log('a.tltle 있는 행 개수:', withTltle);

  // 첫 번째 데이터 행 샘플 (a.tltle 있는 첫 tr)
  const firstDataRow = $rows.filter((i, el) => $(el).find('a.tltle').length > 0).first();
  if (firstDataRow.length) {
    console.log('\n첫 번째 데이터 행 내부 (td 개수, td.no, a.tltle):');
    const tdCount = firstDataRow.find('td').length;
    const no = firstDataRow.find('td.no').text().trim();
    const tltle = firstDataRow.find('a.tltle').text().trim();
    console.log('  td 개수:', tdCount, '| td.no:', no, '| a.tltle:', tltle);
  }

  // 디버깅용으로 HTML 일부 저장 (선택)
  const outPath = new URL('./debug-naver-sise-snippet.html', import.meta.url).pathname;
  const snippet = decodedHtml.substring(0, 8000);
  writeFileSync(outPath, snippet, 'utf8');
  console.log('\nHTML 앞 8000자 저장:', outPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
