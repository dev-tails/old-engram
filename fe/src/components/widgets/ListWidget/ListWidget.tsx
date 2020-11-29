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
  const { items } = props;

  const cellMeasurerCache = new CellMeasurerCache({
    fixedWidth: true,
  });

  let mostRecentWidth = 0;

  const rowRenderer = (params: RowRendererParams) => {
    const { key, index } = params;

    const item = props.items[index];

    return (
      <CellMeasurer
        cache={cellMeasurerCache}
        columnIndex={0}
        key={key}
        parent={params.parent}
        rowIndex={params.index}
        width={mostRecentWidth}
      >
        <div style={params.style}>
          <ListWidgetItem index={index} item={item} {...props} />
        </div>
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
              <List
                deferredMeasurementCache={cellMeasurerCache}
                width={width}
                height={height}
                rowCount={items.length}
                rowHeight={cellMeasurerCache.rowHeight}
                rowRenderer={rowRenderer}
              />
            );
          }}
        </AutoSizer>
      </div>
    </div>
  );
};
