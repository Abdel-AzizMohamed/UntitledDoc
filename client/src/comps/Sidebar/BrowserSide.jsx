import { Link } from "react-router-dom";
import "../../style-core/browse.css";

function BrowserSide({ data, documentName }) {
  return (
    <aside>
      {data &&
        data.map((item) => {
          const records = item.records.map((record) => {
            return (
              <Link key={record.id} to={`/${documentName}/${record.slug}`}>
                <div className="overlay"></div>
                {record.name}
              </Link>
            );
          });

          return (
            <>
              <h2 key={item.chapter.id}>{item.chapter.name}</h2>
              {records}
            </>
          );
        })}
    </aside>
  );
}

export default BrowserSide;
