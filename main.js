// let coinsDATA = [];
let coinUsing;
async function testCoinClick(coinID){
  // const coinRequest = await fetch (`https://api.coingecko.com/api/v3/coins/${coinID}`)
  // const coinResponse = await coinRequest.json()
  // console.log(coinResponse)
  //chart part
  coinUsing = coinID
  const chart30dRequest = await fetch(`https://api.coingecko.com/api/v3/coins/${coinID}/market_chart?vs_currency=usd&days=30&interval=daily`)
  const chart30dResponse = await chart30dRequest.json()
  // console.log(coinResponse)
  // console.log(chart30dResponse)

  //MAP THE PRICES AND TIMEPRICE
  let chart30dPriceTime = chart30dResponse.prices.map(item =>{
  	return item[0]
  })

  let chart30dPrice = chart30dResponse.prices.map(item =>{
  	return item[1]
  })

  let xTheLabel = []
  let yTheData = []
  //PUSH LABEL PART
  for (let i = 0; i < chart30dPriceTime.length; i++){
  	let chart30dPriceTimeFormatted = new Date(chart30dPriceTime[i])
  	let date = chart30dPriceTimeFormatted.getDate();
  	let month = chart30dPriceTimeFormatted.getMonth()
  	month = month + 1
  	let xLabel = `${month}/${date}`
  	xTheLabel.push(xLabel)
  }
  //PUSH DATA PART
  for (let i = 0; i < chart30dPrice.length; i++){
  	let yData = parseFloat(chart30dPrice[i]).toFixed(2).toLocaleString('en-US')
  	yTheData.push(yData)
  }

  let removingCryptoTables = document.getElementById('current-crypto-tables')
  let coinChartHere = document.getElementById('coin-chart-now')
  removingCryptoTables.remove()
  console.log(coinChartHere)
  coinChartHere.style.display = "block"
  let chartButtonClass = Array(document.getElementsByClassName("chartButton"))
  
  chartButtonClass[0][0].style.display = "inline-block"
  chartButtonClass[0][1].style.display = "inline-block"
  chartButtonClass[0][2].style.display = "inline-block"
  
  const labels = [...xTheLabel]
  const dataCoinPrice = [...yTheData]

  console.log(dataCoinPrice)

// data: [{x:'2016-12-25', y:20}, {x:'2016-12-26', y:10}]
const data = {
  labels: labels,
  datasets: [{
    spanGaps: true,
    label: 'Price in Dollars $',
    backgroundColor: 'rgb(116, 0, 184)',
    borderColor: 'rgb(116, 0, 184)',
    data: dataCoinPrice
  }]
};

// data.datasets[0].data = Array(dataCoinPrice[0])
console.log(data.datasets[0].data)
const config = {
  type: 'line',
  data,
  options: {}
};

var myChart = new Chart(
    document.getElementById('myChart'),
    config
);

let h2CoinLabel = document.getElementById("semi-title")
h2CoinLabel.textContent = `${coinID.toUpperCase()} 30 Days Price Chart`

let plContainer = document.getElementById("profitLossContainer")
plContainer.style.display = "block"
}

async function getCoinsData() {
    const coinsAPIRequest = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h%2C7d')
    const coinsAPIResponse = await coinsAPIRequest.json()
    // console.log(coinsAPIResponse[0])
    // console.log(coinsAPIResponse[0].id)

    let coinsDATA = coinsAPIResponse.map(item => {
    	return item
    })

	console.log({ coinsDATA })

    // let coinsDataResponse = {...coinsAPIResponse}
    // let x = [...coinsAPIResponse]
    console.log(coinsDATA.length)

    for (var i = 0; i < coinsDATA.length; i++) {
    	let marketCapRank = coinsDATA[i].market_cap_rank
    	let coinImage = coinsDATA[i].image
    	let coinID = coinsDATA[i].id
    	let coinName = coinsDATA[i].name
    	let coinTicker = coinsDATA[i].symbol.toUpperCase()
    	let coinCurrentPrice = coinsDATA[i].current_price.toLocaleString("en-US")
    	let p24h = parseFloat(coinsDATA[i].price_change_percentage_24h_in_currency).toFixed(2)
    	let p7d = parseFloat(coinsDATA[i].price_change_percentage_7d_in_currency).toFixed(2)
    	let p24hTD = ``
    	let p7dTD = ``
    	
    	if (p24h > 0){
    		p24hTD = `<td class="green">${p24h}%</td>`
    	} else if (p24h < 0){
    		p24hTD = `<td class="red">${p24h}%</td>`
    	}

    	if (p7d > 0){
    		p7dTD = `<td class="green">${p7d}%</td>`
    	} else if (p7d < 0){
    		p7dTD = `<td class="red">${p7d}%</td>`
    	}

    	// console.log(coinName)

	 	let coinCurrent = `
		    <td>${marketCapRank}</td>
		    <td>
		    	<div class="coin-info-div">
					<img src="${coinImage}" alt="${coinID} logo">
					<p><a class="coin-link" href="#" onclick="testCoinClick('${coinID}')"><b>${coinName}</b></a> - <span class="ticker">${coinTicker}</span></p>
				</div>
			</td>
		    <td>$${coinCurrentPrice}</td>
		    ${p24hTD}
		    ${p7dTD}
		  `
			// <td class="p24h">${p24h}%</td>
		 //    <td class="p7d">${p7d}%</td>
		let tableRef = document.getElementById("current-crypto-tables")
		let newRow = tableRef.insertRow(-1)
		newRow.innerHTML = coinCurrent

		// table.appendChild(coinCurrent)
		// console.log(table)
		// let p24hDataStyle = document.getElementByClassName("p24h").value
		// console.log(p24hDataStyle)
		// if (p24hDataStyle > 0){
		// 	document.getElementByClassName('p24h').classList.add("green")
		// } else if (p24h < 0){
		// 	document.getElementByClassName('p24h').classList.add("red")
		// }
x
		// if (p7d > 0){
		// 	document.getElementByClassName('p7d').classList.add("green")
		// } else if (p7d < 0){
		// 	document.getElementByClassName('p24h').classList.add("red")
		// }
    }

    let imageLoader = document.getElementById("wallet-loader-gif")
    imageLoader.remove()

  //   	let p24hClass = document.querySelectorAll("p24h")
		// console.log(p24hClass)
}

getCoinsData()

async function charting90Days(){
	// const coinRequest = await fetch (`https://api.coingecko.com/api/v3/coins/${coinID}`)
	// const coinResponse = await coinRequest.json()
	// console.log(coinResponse)
	//chart part
	// coinUsing = coinID
	console.log("90days")
	const chart90dRequest = await fetch(`https://api.coingecko.com/api/v3/coins/${coinUsing}/market_chart?vs_currency=usd&days=90&interval=daily`)
	const chart90dResponse = await chart90dRequest.json()
	// console.log(coinResponse)
	// console.log(chart30dResponse)
  
	//MAP THE PRICES AND TIMEPRICE
	let chart90dPriceTime = chart90dResponse.prices.map(item =>{
		return item[0]
	})
  
	let chart90dPrice = chart90dResponse.prices.map(item =>{
		return item[1]
	})
  
	let xTheLabel = []
	let yTheData = []
	//PUSH LABEL PART
	for (let i = 0; i < chart90dPriceTime.length; i++){
		let chart90dPriceTimeFormatted = new Date(chart90dPriceTime[i])
		let date = chart90dPriceTimeFormatted.getDate();
		let month = chart90dPriceTimeFormatted.getMonth()
		month = month + 1
		let xLabel = `${month}/${date}`
		xTheLabel.push(xLabel)
	}
	//PUSH DATA PART
	for (let i = 0; i < chart90dPrice.length; i++){
		let yData = parseFloat(chart90dPrice[i]).toFixed(2).toLocaleString('en-US')
		yTheData.push(yData)
	}
  
	// let removingCryptoTables = document.getElementById('current-crypto-tables')
	let my30Chart = document.getElementById('myChart')
	my30Chart.remove()
	let coinChartNow = document.getElementById("coin-chart-now")
	coinChartNow.innerHTML = "<canvas id=\"myChart\"></canvas>"
	// removingCryptoTables.remove()
	// console.log(coinChartHere)
	// coinChartHere.style.display = "block"
	// let chartButtonClass = Array(document.getElementsByClassName("chartButton"))
	
	// chartButtonClass[0][0].style.display = "inline-block"
	// chartButtonClass[0][1].style.display = "inline-block"
	// chartButtonClass[0][2].style.display = "inline-block"
	
	
	const labels = [...xTheLabel]
	const dataCoinPrice = [...yTheData]
  
	console.log(dataCoinPrice)
  
  // data: [{x:'2016-12-25', y:20}, {x:'2016-12-26', y:10}]
  const data = {
	labels: labels,
	datasets: [{
	  spanGaps: true,
	  label: 'Price in Dollars $',
	  backgroundColor: 'rgb(116, 0, 184)',
	  borderColor: 'rgb(116, 0, 184)',
	  data: dataCoinPrice
	}]
  };
  
  // data.datasets[0].data = Array(dataCoinPrice[0])
  console.log(data.datasets[0].data)
  const config = {
	type: 'line',
	data,
	options: {}
  };
  
  let myChart = new Chart(
	  document.getElementById('myChart'),
	  config
  );
  
  let h2CoinLabel = document.getElementById("semi-title")
  h2CoinLabel.textContent = `${coinUsing.toUpperCase()} 90 Days Price Chart`
	
  }

  async function charting180Days(){
	// const coinRequest = await fetch (`https://api.coingecko.com/api/v3/coins/${coinID}`)
	// const coinResponse = await coinRequest.json()
	// console.log(coinResponse)
	//chart part
	// coinUsing = coinID
	console.log("180days")
	const chart180dRequest = await fetch(`https://api.coingecko.com/api/v3/coins/${coinUsing}/market_chart?vs_currency=usd&days=180&interval=daily`)
	const chart180dResponse = await chart180dRequest.json()
	// console.log(coinResponse)
	// console.log(chart30dResponse)
  
	//MAP THE PRICES AND TIMEPRICE
	let chart180dPriceTime = chart180dResponse.prices.map(item =>{
		return item[0]
	})
  
	let chart180dPrice = chart180dResponse.prices.map(item =>{
		return item[1]
	})
  
	let xTheLabel = []
	let yTheData = []
	//PUSH LABEL PART
	for (let i = 0; i < chart180dPriceTime.length; i++){
		let chart180dPriceTimeFormatted = new Date(chart180dPriceTime[i])
		let date = chart180dPriceTimeFormatted.getDate();
		let month = chart180dPriceTimeFormatted.getMonth()
		month = month + 1
		let xLabel = `${month}/${date}`
		xTheLabel.push(xLabel)
	}
	//PUSH DATA PART
	for (let i = 0; i < chart180dPrice.length; i++){
		let yData = parseFloat(chart180dPrice[i]).toFixed(2).toLocaleString('en-US')
		yTheData.push(yData)
	}
  
	// let removingCryptoTables = document.getElementById('current-crypto-tables')
	let my30Chart = document.getElementById('myChart')
	my30Chart.remove()
	let coinChartNow = document.getElementById("coin-chart-now")
	coinChartNow.innerHTML = "<canvas id=\"myChart\"></canvas>"
	// removingCryptoTables.remove()
	// console.log(coinChartHere)
	// coinChartHere.style.display = "block"
	// let chartButtonClass = Array(document.getElementsByClassName("chartButton"))
	
	// chartButtonClass[0][0].style.display = "inline-block"
	// chartButtonClass[0][1].style.display = "inline-block"
	// chartButtonClass[0][2].style.display = "inline-block"
	
	
	const labels = [...xTheLabel]
	const dataCoinPrice = [...yTheData]
  
	console.log(dataCoinPrice)
  
  // data: [{x:'2016-12-25', y:20}, {x:'2016-12-26', y:10}]
  const data = {
	labels: labels,
	datasets: [{
	  spanGaps: true,
	  label: 'Price in Dollars $',
	  backgroundColor: 'rgb(116, 0, 184)',
	  borderColor: 'rgb(116, 0, 184)',
	  data: dataCoinPrice
	}]
  };
  
  // data.datasets[0].data = Array(dataCoinPrice[0])
  console.log(data.datasets[0].data)
  const config = {
	type: 'line',
	data,
	options: {}
  };
  
  let myChart = new Chart(
	  document.getElementById('myChart'),
	  config
  );
  
  let h2CoinLabel = document.getElementById("semi-title")
  h2CoinLabel.textContent = `${coinUsing.toUpperCase()} 180 Days Price Chart`
	
  }

  async function charting30Days(){
	// const coinRequest = await fetch (`https://api.coingecko.com/api/v3/coins/${coinID}`)
	// const coinResponse = await coinRequest.json()
	// console.log(coinResponse)
	//chart part
	// coinUsing = coinID
	console.log("180days")
	const chart180dRequest = await fetch(`https://api.coingecko.com/api/v3/coins/${coinUsing}/market_chart?vs_currency=usd&days=30&interval=daily`)
	const chart180dResponse = await chart180dRequest.json()
	// console.log(coinResponse)
	// console.log(chart30dResponse)
  
	//MAP THE PRICES AND TIMEPRICE
	let chart180dPriceTime = chart180dResponse.prices.map(item =>{
		return item[0]
	})
  
	let chart180dPrice = chart180dResponse.prices.map(item =>{
		return item[1]
	})
  
	let xTheLabel = []
	let yTheData = []
	//PUSH LABEL PART
	for (let i = 0; i < chart180dPriceTime.length; i++){
		let chart180dPriceTimeFormatted = new Date(chart180dPriceTime[i])
		let date = chart180dPriceTimeFormatted.getDate();
		let month = chart180dPriceTimeFormatted.getMonth()
		month = month + 1
		let xLabel = `${month}/${date}`
		xTheLabel.push(xLabel)
	}
	//PUSH DATA PART
	for (let i = 0; i < chart180dPrice.length; i++){
		let yData = parseFloat(chart180dPrice[i]).toFixed(2).toLocaleString('en-US')
		yTheData.push(yData)
	}
  
	// let removingCryptoTables = document.getElementById('current-crypto-tables')
	let my30Chart = document.getElementById('myChart')
	my30Chart.remove()
	let coinChartNow = document.getElementById("coin-chart-now")
	coinChartNow.innerHTML = "<canvas id=\"myChart\"></canvas>"
	// removingCryptoTables.remove()
	// console.log(coinChartHere)
	// coinChartHere.style.display = "block"
	// let chartButtonClass = Array(document.getElementsByClassName("chartButton"))
	
	// chartButtonClass[0][0].style.display = "inline-block"
	// chartButtonClass[0][1].style.display = "inline-block"
	// chartButtonClass[0][2].style.display = "inline-block"
	
	
	const labels = [...xTheLabel]
	const dataCoinPrice = [...yTheData]
  
	console.log(dataCoinPrice)
  
  // data: [{x:'2016-12-25', y:20}, {x:'2016-12-26', y:10}]
  const data = {
	labels: labels,
	datasets: [{
	  spanGaps: true,
	  label: 'Price in Dollars $',
	  backgroundColor: 'rgb(116, 0, 184)',
	  borderColor: 'rgb(116, 0, 184)',
	  data: dataCoinPrice
	}]
  };
  
  // data.datasets[0].data = Array(dataCoinPrice[0])
  console.log(data.datasets[0].data)
  const config = {
	type: 'line',
	data,
	options: {}
  };
  
  let myChart = new Chart(
	  document.getElementById('myChart'),
	  config
  );
  
  let h2CoinLabel = document.getElementById("semi-title")
  h2CoinLabel.textContent = `${coinUsing.toUpperCase()} 30 Days Price Chart`
	
  }

  async function calculateNow(){
	let calculateButton = document.getElementById("calculateButton")
	let pesoValue = document.getElementById("investmentMuchID").value
	let timeValue = document.getElementById("timeValueList").value
	// console.log(pesoValue)
	// console.log(timeValue)
	// var today = new Date();
	// var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	// var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	// var dateTime = date+' '+time;
	const chartCalculateRequest = await fetch(`https://api.coingecko.com/api/v3/coins/${coinUsing}/market_chart?vs_currency=usd&days=30&interval=daily`)
	const chartCalculateReponse = await chartCalculateRequest.json()
	// console.log(chartCalculateReponse.prices)
	// console.log(chartCalculateReponse.prices[chartCalculateReponse.prices.length - 1][1])
	// console.log(chartCalculateReponse.prices[chartCalculateReponse.prices.length - 2][1])
	let todayValue = parseFloat(chartCalculateReponse.prices[chartCalculateReponse.prices.length - 1][1]).toFixed(5)
	let yerterdayValue = parseFloat(chartCalculateReponse.prices[chartCalculateReponse.prices.length - 2][1]).toFixed(5)
	let date7Value = parseFloat(chartCalculateReponse.prices[chartCalculateReponse.prices.length - 8][1]).toFixed(5)
	let date30Value = parseFloat(chartCalculateReponse.prices[chartCalculateReponse.prices.length - 30][1]).toFixed(5)
	// console.log(date30Value)
	// if (timeValue === "Yesterday"){
		
	// }
	console.log(todayValue)
	console.log(yerterdayValue)
	console.log(date7Value)
	console.log(date30Value)

	let yesterPercentage = (((todayValue - yerterdayValue)/yerterdayValue)*100).toFixed(4)
	let date7Percentage = (((todayValue - date7Value)/date7Value)*100).toFixed(4)
	let date30Percentage = (((todayValue - date30Value)/date30Value)*100).toFixed(4)
	let plSpan = document.getElementById("pl-span")

	console.log(yesterPercentage)
	console.log(date7Percentage)
	console.log(date30Percentage)
	console.log(plSpan)
	
	let nowWorthSpan = document.getElementById("nowWorthSpan")
	if (timeValue === "Yesterday"){
		plSpan.textContent = yesterPercentage
		// if (yesterPercentage < 0){
		// 	// let nowMoneyWorth = ((pesoValue * (yesterPercentage/100)) + pesoValue)
		// 	let xMoneyPercentValue = ((yesterPercentage/100)*pesoValue)
		// 	let xMoneyNowValue = (parseFloat(pesoValue) + parseFloat(xMoneyPercentValue))
		// 	// console.log(xMoneyNowValue)
		// 	nowWorthSpan.textContent = xMoneyNowValue
		// } else if (yesterPercentage > 0){
		// 	let xMoneyPercentValue = ((yesterPercentage/100)*pesoValue)
		// 	let xMoneyNowValue = (parseFloat(pesoValue) + parseFloat(xMoneyPercentValue))
		// 	// console.log(xMoneyNowValue)
		// 	nowWorthSpan.textContent = xMoneyNowValue
		// }

		
			// let nowMoneyWorth = ((pesoValue * (yesterPercentage/100)) + pesoValue)
			let xMoneyPercentValue = ((yesterPercentage/100)*pesoValue)
			let xMoneyNowValue = (parseFloat(pesoValue) + parseFloat(xMoneyPercentValue))
			// console.log(xMoneyNowValue)
			let xMN = parseFloat(xMoneyNowValue.toFixed(4).toLocaleString("en-US")) 
			nowWorthSpan.textContent = xMN.toLocaleString("en-US")
		
	} else if (timeValue === "7 Days Ago"){
		plSpan.textContent = date7Percentage

		let xMoneyPercentValue = ((date7Percentage/100)*pesoValue)
			let xMoneyNowValue = (parseFloat(pesoValue) + parseFloat(xMoneyPercentValue))
			// console.log(xMoneyNowValue)
			let xMN = parseFloat(xMoneyNowValue.toFixed(4).toLocaleString("en-US")) 
			nowWorthSpan.textContent = xMN.toLocaleString("en-US")

	} else if (timeValue === "30 Days Ago"){
		plSpan.textContent = date30Percentage

		let xMoneyPercentValue = ((date30Percentage/100)*pesoValue)
			let xMoneyNowValue = (parseFloat(pesoValue) + parseFloat(xMoneyPercentValue))
			// console.log(xMoneyNowValue)
			console.log(xMoneyNowValue)
			let xMN = parseFloat(xMoneyNowValue.toFixed(4).toLocaleString("en-US"))
			console.log(xMN) 
			nowWorthSpan.textContent = xMN.toLocaleString("en-US")
	}

	// console.log(yesterPercentage)
	

  }

// function percentageColors(){
// 	setTimeout(function(){
// 		let p24hClass = document.querySelectorAll("p24h")
// 		console.log(p24hClass)
// 	}, 10000)
	
// }

// percentageColors()
    // console.log(coinsDATA.length)
    // console.log(coinsDataResponse)
    // console.log(typeof coinsDataResponse)
    // console.log(x)
    // console.log(typeof x)
    // console.log(coinsDataResponse[0].id)
    // console.log(x[0].id)
    // console.log(parseFloat(x).toFixed(2)+"%");

    // for (var i = 0; i < coinsDataResponse.length; i++) {
    	// coinsDataResponse[i]
    	// let marketCapRank = coinsDataResponse[0].market_cap_rank
    	// let coinImage = coinsDataResponse[0].image
    	// let coinID = coinsDataResponse[0].id
    	// let coinName = coinsDataResponse[0].name
    	// let coinTicker = coinsDataResponse[0].id.toUpperCase()
    	// let coinCurrentPrice = coinsDataResponse[0].current_price.toLocaleString("en-US")
    	// let p24h = parseFloat(coinsDataResponse[0].price_change_percentage_24h_in_currency).toFixed(2)
    	// let p7d = parseFloat(coinsDataResponse[0].price_change_percentage_24h_in_currency).toFixed(2)

    	// console.log(coinsDataResponse[i])
    // 	let x = `<tr>
			 //    <td>${marketCapRank}</td>
			 //    <td>
			 //    	<div class="coin-info-div">
				// 		<img src="${}" alt="${} logo">
				// 		<p><a class="coin-link" href="#">${}</a> - <span class="ticker">${}</span></p>
				// 	</div>
				// </td>
			 //    <td>$${}</td>
			 //    <td>${}%</td>
			 //    <td>${}%</td>
			 //  </tr>
			 //  `

		// document.getElementById('current-crypto-tables').appendChild(x)
		// let tableX = document.querySelector("tbody")

		// tableX.appendChild(x)
    // }





    // console.log(coinsDATA)
    
    // const list = catFacts.map(catFact => {
    //     const liElement = document.createElement('li')
    //     liElement.innerHTML = catFact

    //     return liElement
    // })

    // console.log(list)

    // document.getElementById('list').append(list)
// }


// let tbodys = document.querySelector("tbody")
// let tbodyy = Array(tbodys)
