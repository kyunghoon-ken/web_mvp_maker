/**
 * KOSPI Top 10 크롤 로직 검증 스크립트
 * 실행: npm run test:crawl (scripts 폴더에서)
 *
 * - 10개 나오면: 크롤 로직은 정상. empty view는 API/프론트 쪽 확인.
 * - 0개 나오면: 네이버 페이지 구조/인코딩 변경 가능성 → debug:html 로 HTML 확인.
 */

import axios from 'axios';
import * as cheerio from 'cheerio';
import iconv from 'iconv-lite';

const url = 'https://finance.naver.com/sise/sise_market_sum.naver?&page=1';

async function fetchKospiTop10() {
  const { data } = await axios.get(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    },
    responseType: 'arraybuffer',
  });

  const decodedHtml = iconv.decode(Buffer.from(data), 'euc-kr');
  const $ = cheerio.load(decodedHtml);

  const stocks = [];

  $('table.type_2 tbody tr').each((i, element) => {
    if (stocks.length >= 10) return;

    const $row = $(element);
    const $nameLink = $row.find('a.tltle');
    if ($nameLink.length === 0) return;

    const company_name = $nameLink.text().trim();
    const href = $nameLink.attr('href') || '';
    const stock_code = href.split('code=')[1] || '';

    const rank = parseInt($row.find('td.no').text().trim(), 10);

    const priceStr = $row.find('td:nth-child(3)').text().trim().replace(/,/g, '');
    const price = parseInt(priceStr, 10);

    const $changeTd = $row.find('td:nth-child(4)');
    const changeText = $changeTd.text().trim();
    const changeStr = changeText.replace(/,/g, '').replace(/[^0-9]/g, '');
    let change = parseInt(changeStr, 10);

    const $ico = $changeTd.find('img');
    if ($ico.length > 0) {
      const alt = $ico.attr('alt');
      if (alt === '상승' || alt === '상한') {
        // positive
      } else if (alt === '하락' || alt === '하한') {
        change = -change;
      }
    }

    const changePctText = $row.find('td:nth-child(5)').text().trim();
    const changePctStr = changePctText.replace(/%/g, '').replace(/\+/g, '');
    const change_pct = parseFloat(changePctStr);

    if (changePctText.includes('-') && change > 0) {
      change = -change;
    }

    stocks.push({
      rank,
      stock_code,
      company_name,
      price,
      change,
      change_pct,
    });
  });

  return stocks;
}

async function main() {
  console.log('KOSPI Top 10 크롤 테스트 시작...\n');

  try {
    const stocks = await fetchKospiTop10();

    console.log('추출 개수:', stocks.length);
    if (stocks.length === 0) {
      console.log('\n→ 0건이면 셀렉터/인코딩 문제일 수 있어요. npm run debug:html 로 HTML 구조를 확인해 보세요.');
    } else {
      console.log('\n→ 크롤 로직은 정상입니다. empty view는 API 경로 호출 여부나 프론트 데이터 바인딩을 확인하세요.\n');
      console.log(JSON.stringify(stocks, null, 2));
    }
  } catch (err) {
    console.error('에러:', err.message);
    if (err.response) console.error('HTTP 상태:', err.response.status);
    process.exit(1);
  }
}

main();
