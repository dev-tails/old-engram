import React, { useRef } from "react";
import { Note } from "../../notes/NotesApi";
import "./ListWidget.scss";
import { ListWidgetItem } from "./ListWidgetItem/ListWidgetItem";
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  InfiniteLoader,
  List,
} from "react-virtualized";
import { objectIdFromDate } from "../../../utils/ObjectId";

export type ListWidgetProps = {
  hasNextPage: boolean;
  isNextPageLoading: boolean;
  loadNextPage: () => void;
  items: Note[];
  onItemChanged?: (item: Partial<Note>, index: number) => void;
  onItemDeleted?: (itemId: string, index: number) => void;
  checkboxes?: boolean;
  hideDelete?: boolean;
};

type RowRendererParams = {
  parent: any;
  key: string;
  index: number;
  isScrolling: boolean;
  isVisible: boolean;
  style: any;
};

export const ListWidget: React.FC<ListWidgetProps> = (props) => {
  const { hasNextPage, isNextPageLoading, loadNextPage, items } = props;

  const rowCount = hasNextPage ? items.length + 1 : items.length;

  const loadMoreRows = isNextPageLoading ? () => {} : loadNextPage;
  const isRowLoaded = ({ index }: { index: number }) => {
    return !hasNextPage || index < items.length;
  };

  const cellMeasurerCache = new CellMeasurerCache({
    fixedWidth: true,
  });

  let mostRecentWidth = 0;

  const rowRenderer = (params: RowRendererParams) => {
    let content;
    const { key, index } = params;

    if (!isRowLoaded({ index })) {
      content = (
        <ListWidgetItem
          index={index}
          item={{ _id: objectIdFromDate(new Date()), body: "Loading..." }}
          {...props}
        />
      );
    } else {
      const item = props.items[index];
      content = <ListWidgetItem index={index} item={item} {...props} />;
    }

    return (
      <CellMeasurer
        cache={cellMeasurerCache}
        columnIndex={0}
        key={key}
        parent={params.parent}
        rowIndex={params.index}
        width={mostRecentWidth}
      >
        <div style={params.style}>{content}</div>
      </CellMeasurer>
    );
  };

  return (
    <div className="list-widget">
      <div style={{ flex: "1 1 auto" }}>
        <AutoSizer>
          {({ height, width }: { height: number; width: number }) => {
            mostRecentWidth = width;

            return (
              <InfiniteLoader
                isRowLoaded={isRowLoaded}
                loadMoreRows={loadMoreRows}
                rowCount={rowCount}
              >
                {({ onRowsRendered, registerChild }: any) => {
                  return (
                    <List
                      ref={registerChild}
                      onRowsRendered={onRowsRendered}
                      deferredMeasurementCache={cellMeasurerCache}
                      width={width}
                      height={height}
                      rowCount={rowCount}
                      rowHeight={cellMeasurerCache.rowHeight}
                      rowRenderer={rowRenderer}
                    />
                  );
                }}
              </InfiniteLoader>
            );
          }}
        </AutoSizer>
      </div>
    </div>
  );
};
