// eslint-disable-next-line no-unused-vars
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../../redux/actions';

const PageSelector = () => {
  const dispatch = useDispatch();
  const myProducts = useSelector((state) => state.myProducts);
  const page = useSelector((state) => state.homeStatus.page);

  const handlePageChange = (action) => {
    let maxPage = Math.ceil(myProducts.data.length / 15);
    if (action === 'next' && maxPage !== page) {
      dispatch(setPage(page + 1));
    } else if (action === 'prev' && page !== 1) {
      dispatch(setPage(page - 1));
    }
  };

  const handlePageNumber = (number) => {
    dispatch(setPage(number));
  };

  return (
    <>
      <div>
        <div>
          <button
            name='prev'
            onClick={() => handlePageChange('prev')}
          >
            &laquo; Prev
          </button>
          {Array.from(
            { length: Math.ceil(myProducts.length / 15) },
            (_, i) => (
              <button
                key={i}
                name={i}
                className={`${styles.pageNumberButton} ${page===i+1 ? styles.pageNumberButtonActive : ''}`}
                onClick={() => handlePageNumber(i + 1)}
              >
                {i + 1}
              </button>
            )
          )}
          <button
            name='next'
            className=""
            onClick={() => handlePageChange('next')}
          >
            Next &raquo;
          </button>
        </div>
        {/* <span className={styles.pageSpan}>Page: {page}</span> */}
      </div>
    </>
  );
};

export default PageSelector;