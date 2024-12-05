import VisHeader from "components/Landing/minors/headers/vHeader";
import HidHeader from "components/Landing/minors/headers/hidHeader";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAll } from "firebasedatas/getProducts";
import MoreWidget from "components/detail/moreWidget";

const Catalog = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const isVisible = false;

  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      const data = [];
      await getAll(data)
        .then((res) => {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          const filter = res?.filter((val) => val.name.toLowerCase().includes(query.toLowerCase()));
          setData(filter);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getData();
  }, [query]);
  return (
    <div className="max-[450px]:mt-[56px] w-full h-full">
      <VisHeader />
      <HidHeader isVisibles={isVisible} />

      {/* <GroupHeaders headings={navtitle} /> */}

      <div className="mt-0  h-full relative min-[450px]:mt-0 sm:mt-0 mb-[1rem] w-full p-2 min-[450px]:p-3 gap-6 flex flex-col">
        <MoreWidget payload={data} />
      </div>
    </div>
  );
};

export default Catalog;
