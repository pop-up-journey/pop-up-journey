1. NEXT_PUBLIC_API_URL_DEV 후에 수정 필요
   배포환경에서는 PROD URL로 수정 필요
   혹은 `if (NEXT_PUBLIC_API_URL_PROD ? NEXT_PUBLIC_API_URL_PROD : http://localhost:3000)`처리
