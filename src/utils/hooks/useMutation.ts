import React from "react"

export const useMutation = <T, K>(
  request: (body: T) => Promise<K>
) => {
  const [data, setData] = React.useState<K | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const mutationAsync = React.useCallback(async (body: T): Promise<K> => {
    setIsLoading(true);
    const response = await request(body);
    setIsLoading(false);
    return response;
  }, [])

  return {mutationAsync, data, isLoading, error};
}