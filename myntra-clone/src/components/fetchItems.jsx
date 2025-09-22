import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { itemsAction } from "../../store/itemsSlice.js";
import { fetchStatusAction } from "../../store/fetchStatusSlice.js";

const FetchItems = () => {
  const fetchStatus = useSelector((store) => store.fetchStatus);
  const dispatch = useDispatch();
  console.log(fetchStatus)

  useEffect(() => {
    if (fetchStatus.fetchDone) return;

    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(fetchStatusAction.markFetchingStarted())

    fetch("http://localhost:8080/items", { signal })
    

      .then((res) => res.json())
      .then(({ items }) => {
        dispatch(fetchStatusAction.markFetchDone());
        dispatch(fetchStatusAction.markFetchingFinished())
        dispatch(itemsAction.addInitialItems(items));
        
      });
    return () => {
      controller.abort();
    };
  }, [fetchStatus]);

  return (
    <>
      
    </>
  );
};
export default FetchItems;
