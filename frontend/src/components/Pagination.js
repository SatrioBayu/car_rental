const Pagination = (props) => {
  const changePage = (e) => {
    if (e < 1) {
      props.changePage(1);
    } else if (e > props.pages) {
      props.changePage(props.pages);
    } else {
      props.changePage(e);
    }
  };

  const data = () => {
    let html = [];
    if (props.pages <= 3) {
      for (let i = 1; i <= props.pages; i++) {
        html.push(
          <li key={i} class={`page-item ${i == props.page ? "active" : ""}`}>
            <a onClick={() => changePage(i)} class="page-link" href="#">
              {i}
            </a>
          </li>
        );
      }
    } else {
      if (props.page >= props.pages - 2) {
        for (let i = props.pages - 2; i <= props.pages; i++) {
          html.push(
            <li key={i} class={`page-item ${i == props.page ? "active" : ""}`}>
              <a onClick={() => changePage(i)} class="page-link" href="#">
                {i}
              </a>
            </li>
          );
        }
      } else {
        for (let i = props.page; i <= props.pages; i++) {
          if (i == props.page + 2 && props.pages - 2 != props.page) {
            html.push(
              <li key={i} class="page-item">
                <a class="page-link" href="#">
                  ...
                </a>
              </li>
            );
          } else if (i > props.page + 2 && i != props.pages) {
            continue;
          } else {
            html.push(
              <li key={i} class={`page-item ${i == props.page ? "active" : ""}`}>
                <a onClick={() => changePage(i)} class="page-link" href="#">
                  {i}
                </a>
              </li>
            );
          }
        }
      }
    }
    return html;
  };

  const list = data();

  return (
    <div class="d-flex pagination justify-content-center">
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <a onClick={() => changePage(props.page - 1)} class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {list.map((list) => list)}
          <li class="page-item">
            <a onClick={() => changePage(props.page + 1)} class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
