import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ListWidget } from "./widgets/ListWidget/ListWidget";
import { getWidget, WidgetData } from "./widgets/WidgetsApi";

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

  return (
    <div className="view-widget-page">
      <ListWidget items={widgetData.items} />
    </div>
  );
};
