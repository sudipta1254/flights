import axios from "axios";

const fetchData = async (url, setLoading) => {
   try {
      const { data } = await axios.get(url);
      return data;
   } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
      return null;
   }
};

export const init = async (input, setLoading, setChartData) => {
   const dy = new Date();
   const currDay = dy.toISOString().split("T")[0];
   dy.setDate(dy.getDate() - 1);
   const prevDay = dy.toISOString().split("T")[0];
   
   if (!input) {
      alert('Enter location to continue!');
      return;
   }
   setLoading(true);

   const yV1 = [], yV2 = [];
   const api = `https://api.weatherapi.com/v1/forecast.json?q=${input}&key=${process.env.REACT_APP_WEATHER_KEY}&dt=`;

   const dataPrevDay = await fetchData(api + prevDay, setLoading);
   if (dataPrevDay) {
      dataPrevDay.forecast.forecastday[0].hour.forEach(h => yV2.push(Math.round(h.temp_c)));
   }

   const dataCurrDay = await fetchData(api + currDay, setLoading);
   if (dataCurrDay) {
      const currentHour = new Date(dataCurrDay.current.last_updated_epoch);
      dataCurrDay.forecast.forecastday[0].hour.forEach(h => {
         const forecastHour = new Date(h.time_epoch);
         if (currentHour - forecastHour < 0) return;
         yV1.push(Math.round(h.temp_c));
      });

      setChartData({ yV1, yV2, location: dataCurrDay.location });
   }

   setLoading(false);
};
