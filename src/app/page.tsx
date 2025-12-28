import { GenerateQuotePage } from "./generate/page";
import RootLayout from "./layout";

const HomePage = () => {
  return (
    <RootLayout>
      <GenerateQuotePage />
    </RootLayout>
  );
};

export default HomePage;
