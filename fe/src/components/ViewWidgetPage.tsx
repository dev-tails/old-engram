import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { updateNote } from "./notes/NotesApi";
import TextBox from "./textbox/TextBox";
import { ListWidget, ListWidgetProps } from "./widgets/ListWidget/ListWidget";
import { getWidget, submitWidgetNote, WidgetData } from "./widgets/WidgetsApi";

export type ViewWidgetPageProps = {};

export type ViewWidgetPageParams = {
  widgetId: string;
};

export const ViewWidgetPage: React.FC<ViewWidgetPageProps> = (props) => {
  const { widgetId } = useParams<ViewWidgetPageParams>();
  const [widgetData, setWidgetData] = useState<WidgetData | null>(null);

  const loadWidgetData = async () => {
    const widget = await getWidget(widgetId);
    setWidgetData(widget);
  };

  useEffect(() => {
    loadWidgetData();
  }, [widgetId]);

  if (!widgetData) {
    return null;
  }

  const handleItemChanged: ListWidgetProps["onItemChanged"] = (item) => {
    updateNote(item);
  };

  const handleSubmit = (body: string) => {
    submitWidgetNote(widgetId, body);
  };

  return (
    <div className="view-widget-page">
      <ListWidget items={widgetData.items} onItemChanged={handleItemChanged} />
      <TextBox onSubmit={handleSubmit} />
    </div>
  );
};
