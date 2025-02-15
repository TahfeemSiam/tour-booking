import { inject } from '@angular/core';
import { Router } from '@angular/router';

export function checkIfValidToken() {
  const router = inject(Router);
  let tokenExpired: boolean;
  const expiry = JSON.parse(
    atob(
      'eyJhbGciOiJSUzI1NiIsImtpZCI6ImVlYzUzNGZhNWI4Y2FjYTIwMWNhOGQwZmY5NmI1NGM1NjIyMTBkMWUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2NzY2MDkwMzEzODQtYzhmcWE3NWdmYnVuamtmNGlxMzdvaDJpZzFxNDJnZzMuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2NzY2MDkwMzEzODQtYzhmcWE3NWdmYnVuamtmNGlxMzdvaDJpZzFxNDJnZzMuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDExMzQyMDIwNjI5MDU0ODY3NTAiLCJlbWFpbCI6InRhaGZlZW0uc2lhbUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmJmIjoxNzM5NTA2OTMwLCJuYW1lIjoiVGFoZmVlbSBTaWFtIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0l1dGc2QTZCbHJHM0Y4TnRVdjZScmtQMi16bmY5Vkxyd2Jfb0Y1SG1lR09IYkdDQT1zOTYtYyIsImdpdmVuX25hbWUiOiJUYWhmZWVtIiwiZmFtaWx5X25hbWUiOiJTaWFtIiwiaWF0IjoxNzM5NTA3MjMwLCJleHAiOjE3Mzk1MTA4MzAsImp0aSI6IjYwOGU2ZjhiYjc1NzkwMDUyZmFiZDJmYmRkYTE4OTkzM2IyNmM1ZTQifQ.m-VZswSWy5YowIPcZ95TuZGxAnoZfNPM6nsvguPFQaHhRRKd5BbRqLqv-HgJvE0MlfgInEzaWOfInlRQyr7zjDaFoWNrC8KEwbr6k-3XKZBu0TQ94OXLPFIhDzVAQI201JVHCIHGuhF9Y6EtaH4mGQzmVruZ9OoD-N8Yzj1wy4v5flddEUKjl9tUPFOOAuCz5iBaDQz4teJTk6Mg4ArLA3mTJJdCzk_pit9qC9PG7qqqkcyaBMVQjY2vOTwXeFZRPtJwHwi0iT4HujyDiQ-TZutcacVK4sqyfUwnXsCquum8ynyMnvTDmPsY1x2wNAgWcVR340ltFFvDLJu-bUI04g'.split(
        '.'
      )[1]
    )
  ).exp;
  tokenExpired = Math.floor(new Date().getTime() / 1000) >= expiry;
  if (tokenExpired) {
    router.navigate(['/login']);
    return false;
  } else {
    return true;
  }
}
