import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import TextBox from "./textbox/TextBox";
import { ListWidget } from "./widgets/ListWidget/ListWidget";
import { getWidget, submitWidgetNote, WidgetData } from "./widgets/WidgetsApi";

type ViewWidgetPageProps = {};

type ViewWidgetPageParams = {
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
  });

  if (!widgetData) {
    return null;
  }

  const handleSubmit = (body: string) => {
    submitWidgetNote(widgetId, body);
  };

  return (
    <div className="view-widget-page">
      <ListWidget items={widgetData.items} />
      <TextBox onSubmit={handleSubmit} />
    </div>
  );
};
