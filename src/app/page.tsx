import CategoryArticle from "@/components/CategoryArticle";
import HomeArticle from "@/components/HomeArticle";
import QuickLinks from "@/components/QuickLinks";

export default function Home() {
  return (
    <>
      <div className=" container mx-auto  py-6 grid grid-cols-4 ">
        <CategoryArticle />
        <HomeArticle />
        <QuickLinks />
      </div>
    </>
  );
}
