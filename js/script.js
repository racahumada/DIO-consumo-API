const apikey = {
  key: '0896b143-82b0-4f7c-8b54-b42b78a93d90',
};

const formatDate = (value) => {
  const regDate = /^[0-9]{4}-[0-9]{2}-[0-9]{2}/;

  let arrayReg = regDate.exec(value);
  const [year, month, day] = arrayReg.toString().split('-');

  return `${day}-${month}-${year}`;
};

fetch(
  `https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?CMC_PRO_API_KEY=${apikey.key}`
)
  .then((response) => {
    if (!response.ok)
      throw new Error(
        `Erro ao executar a requisição, status ${response.status}`
      );
    return response.json();
  })
  .then((api) => {
    let text = '';
    for (let i = 0; i < 10; i++) {
      const { name, symbol, first_historical_data, slug } = api.data[i];
      const date = formatDate(first_historical_data);

      text += `
        <div class="card m-2">
          <img 
            src="./img/${slug}.png" 
            class="card-img-top" 
            alt="coin"  
             />
            <div class="card-body">
              <h5 class="card-title">${name}</h5>
              <p class="card-text">${symbol}</p>
              <p>Data Inicial: <br /> ${date}</p>
            </div>
        </div>
      `;

      const divCoins = document.querySelector('#coins');
      divCoins.innerHTML = text;
    }
  })
  .catch((error) => {
    console.error(error);
  });
