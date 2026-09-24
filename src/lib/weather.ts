// Project direction and ownership: Aarush & Project Team.
// Live weather only. If Open-Meteo is unreachable we surface an error instead
// of showing invented forecast values.

export interface ForecastDay {
  date: string;
  max: number;
  min: number;
  rain: number;
  wind: number;
  spraySafe: boolean;
}

export function isSpraySafe(rain: number, wind: number) {
  return rain < 30 && wind < 20;
}

export async function fetchForecast(area: string, country: string): Promise<ForecastDay[]> {
  const geoRes = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      area || country,
    )}&count=1&language=en&format=json`,
  );
  if (!geoRes.ok) throw new Error("geocoding failed");
  const geo = (await geoRes.json()) as {
    results?: { latitude: number; longitude: number; name: string }[];
  };
  const place = geo.results?.[0];
  if (!place) throw new Error("location not found");

  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}` +
    `&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max` +
    `&timezone=auto&forecast_days=5`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("forecast failed");
  const data = (await res.json()) as {
    daily?: {
      time: string[];
      temperature_2m_max: number[];
      temperature_2m_min: number[];
      precipitation_probability_max: (number | null)[];
      wind_speed_10m_max: number[];
    };
  };
  const d = data.daily;
  if (!d) throw new Error("forecast empty");

  return d.time.map((date, i) => {
    const rain = Math.round(d.precipitation_probability_max[i] ?? 0);
    const wind = Math.round(d.wind_speed_10m_max[i] ?? 0);
    return {
      date,
      max: Math.round(d.temperature_2m_max[i] ?? 0),
      min: Math.round(d.temperature_2m_min[i] ?? 0),
      rain,
      wind,
      spraySafe: isSpraySafe(rain, wind),
    };
  });
}
