export const useQueriesState = (queries: any) => {
	const isLoading = queries.some((query: any) => query.isLoading);
	const isError = queries.some((query: any) => query.isError);
	const isAccessible = queries[0].data;

	return { isLoading, isError, isAccessible };
};
