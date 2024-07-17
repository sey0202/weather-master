import { useState } from "react";

function WeatherAPI() {
  // 도시 이름을 저장하는 상태 변수
  const [city, setCity] = useState();
  // 날씨 데이터를 저장하는 상태 변수
  const [weatherData, setWeatherData] = useState();
  // 에러 메시지를 저장하는 상태 변수
  const [error, setError] = useState();

  // 인풋 값이 변경될 때 호출되는 함수
  const inputChange = (e) => {
    setCity(e.target.value);
  };

  // 날씨 API를 호출할 URL
  const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`;
  // API 호출에 필요한 옵션 (메서드와 헤더 정보)
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "1e9ac54730msh13d00380a6ff062p131894jsna9aadb2aac13",
      "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
    },
  };

  // 날씨 데이터를 가져오는 비동기 함수
  const fetchWeatherData = async () => {
    try {
      // API 호출
      const response = await fetch(url, options);
      // 응답이 성공적이지 않다면 에러를 발생시킴
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      // 응답 데이터를 JSON으로 변환
      const result = await response.json();
      // 변환된 데이터를 상태 변수에 저장
      setWeatherData(result);
      console.log(result);
    } catch (error) {
      // 에러가 발생하면 날씨 데이터를 null로 설정하고 에러 메시지를 저장
      setWeatherData(null);
      setError(error.message);
    }
  };

  return (
    <div className="WeatherAPI">
      <h1>날씨 앱</h1>
      {/* 사용자가 도시를 입력할 수 있는 입력 필드 */}
      <input type="text" placeholder="도시를 입력해주세요" value={city} onChange={inputChange}/>
      {/* 날씨 정보를 조회하는 버튼 */}
      <button onClick={fetchWeatherData}>날씨 정보 확인</button>

      {/* 에러 메시지를 표시 */}
      {error && <p> {error} </p>}
      {/* 날씨 데이터를 표시 */}
      {weatherData && (
        <div>
          <img src={weatherData.current.condition.icon} alt="" />
          <h2> {weatherData.location.name} </h2>
          <p>
            Temperature: {weatherData.current.temp_c} °C
          </p>
          <p>
            Weather: {weatherData.current.condition.text}
          </p>
        </div>
      )}
    </div>
  );
}

export default WeatherAPI;