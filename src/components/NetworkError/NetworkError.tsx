const NetworkError = ({ error }: { error: Error }) => {
  return <span>Error: {error.message}</span>;
};

export default NetworkError;
