import { styled } from "styled-components";
import { TableHTMLAttributes, useEffect } from "react";
import { DefaultLoader } from "../../loader";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../../modals/slice";

interface Props extends TableHTMLAttributes<HTMLTableElement> {
  isLoading?: boolean;
}

export const StlyledTable = styled.table`
  text-align: left;
  overflow: auto;
  width: 100%;
`;

export const Table = (props: Props) => {
  const dispatch = useDispatch();
  const isLoading = props.isLoading;
  let tableProps = {
    ...props,
    isLoading: undefined,
  };

  useEffect(() => {
    if(isLoading) {
      dispatch(showLoader({}))
    }
    else {
      dispatch(hideLoader())
    }
  }, [isLoading])

  return (
    <div className="flex-1 relative">
      <StlyledTable {...tableProps} />
      {/* {isLoading && (
        <div className="absolute flex justify-center items-center bg-modal z-10 top-0 h-full w-full modal-backdrop">
          <DefaultLoader />
        </div>
      )} */}
    </div>
  );
};
