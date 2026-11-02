import { useSeaQuery } from "@/api/client/requests"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export type OnlinestreamPreference = {
    mediaId: number
    provider?: string
    server?: string
    quality?: string
}

const ONLINESTREAM_PREFERENCES_KEY = "onlinestream-preferences"
const ENDPOINT = "/api/v1/onlinestream/preferences"

export function useGetOnlinestreamPreferences() {
    const { seaFetch } = useSeaQuery()
    return useQuery({
        queryKey: [ONLINESTREAM_PREFERENCES_KEY],
        queryFn: () => seaFetch<OnlinestreamPreference[]>(ENDPOINT, "GET"),
        staleTime: 60_000,
    })
}

export function useSaveOnlinestreamPreference() {
    const { seaFetch } = useSeaQuery()
    const qc = useQueryClient()
    return useMutation({
        mutationFn: (pref: OnlinestreamPreference) => seaFetch<boolean>(ENDPOINT, "POST", pref),
        onSuccess: async () => {
            await qc.invalidateQueries({ queryKey: [ONLINESTREAM_PREFERENCES_KEY] })
        },
    })
}
