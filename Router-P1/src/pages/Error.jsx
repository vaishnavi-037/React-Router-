import MainNavigation from "../Components/MainNavigation";

const ErrorPage = () => {
  return (
    <>
      <MainNavigation />
      <main>
        <h1>An Error occurred!!</h1>
        <h4>Could not find this page!!</h4>
      </main>
    </>
  );
};

export default ErrorPage;
