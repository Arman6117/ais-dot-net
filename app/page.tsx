import { Button } from "@/components/ui/button";
import Magnetic from "@/components/ui/magnetic";


export default function Home() {
  return (
    <main className="p-12">
      {/* <MainApp> */}
        <h1>This is hero section</h1>
        <Magnetic>

        <Button>
          Testing the magnetic
        </Button>
        </Magnetic>
      {/* </MainApp> */}
    </main>
  );
}
