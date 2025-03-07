import '@ui5/webcomponents-fiori/dist/TimelineItem.js';
import { ReactNode } from 'react';
import { CommonProps } from '../../interfaces/CommonProps';
import { Ui5CustomEvent } from '../../interfaces/Ui5CustomEvent';
import { Ui5DomRef } from '../../interfaces/Ui5DomRef';
import { withWebComponent } from '../../internal/withWebComponent';

interface TimelineItemAttributes {
  /**
   * Defines the icon to be displayed as graphical element within the `TimelineItem`. SAP-icons font provides numerous options.
   *
   * See all the available icons in the <ui5-link target="_blank" href="https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
   */
  icon?: string;
  /**
   * Defines the name of the item, displayed before the `title-text`.
   */
  name?: string;
  /**
   * Defines if the `name` is clickable.
   */
  nameClickable?: boolean;
  /**
   * Defines the subtitle text of the component.
   */
  subtitleText?: string;
  /**
   * Defines the title text of the component.
   */
  titleText?: string;
}

export interface TimelineItemDomRef extends TimelineItemAttributes, Ui5DomRef {}

export interface TimelineItemPropTypes extends TimelineItemAttributes, CommonProps {
  /**
   * Determines the description of the `TimelineItem`.
   */
  children?: ReactNode | ReactNode[];
  /**
   * Fired when the item name is pressed either with a click/tap or by using the Enter or Space key.
   *
   * **Note:** The event will not be fired if the `name-clickable` attribute is not set.
   */
  onNameClick?: (event: Ui5CustomEvent<TimelineItemDomRef>) => void;
}

/**
 * An entry posted on the timeline
 *
 * <ui5-link href="https://sap.github.io/ui5-webcomponents/playground/components/Timeline" target="_blank">UI5 Web Components Playground</ui5-link>
 */
const TimelineItem = withWebComponent<TimelineItemPropTypes, TimelineItemDomRef>(
  'ui5-timeline-item',
  ['icon', 'name', 'subtitleText', 'titleText'],
  ['nameClickable'],
  [],
  ['name-click']
);

TimelineItem.displayName = 'TimelineItem';

export { TimelineItem };
