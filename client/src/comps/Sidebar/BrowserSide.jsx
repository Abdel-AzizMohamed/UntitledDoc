import "../../style-core/browse.css";

function BrowserSide({ data, documentName, setRecordId }) {
  return (
    <aside>
      {data &&
        data.map((item) => {
          const records = item.records.map((record) => {
            return (
              <div key={record.id} onClick={() => setRecordId(record.id)}>
                <div className="overlay"></div>
                {record.name}
              </div>
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
