const Pagination = ({ page, setPage }: any) => (
  <div className="pagination">
    <button onClick={() => setPage((p: number) => Math.max(1, p - 1))}>Prev</button>
    <span>Page {page}</span>
    <button onClick={() => setPage((p: number) => p + 1)}>Next</button>
  </div>
);

export default Pagination;
