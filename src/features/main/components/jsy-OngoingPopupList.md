1. `   const current = useSaveStore.getState().savedStores;`

`const { savedStores } = useSaveStore.getState();`
이렇게 변경 가능

2.`const { data: session } = useSession();`
getUserInfo 사용하면 좋음
