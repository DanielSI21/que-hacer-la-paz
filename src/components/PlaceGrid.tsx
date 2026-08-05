import type { TourismPlace } from "../content/types";
import { PlaceCard } from "./PlaceCard";

interface Props {
  places: TourismPlace[];
  /** Destaca el primer elemento a ancho completo. */
  featureFirst?: boolean;
}

export function PlaceGrid({ places, featureFirst = false }: Props) {
  return (
    <ul className="grid" role="list">
      {places.map((place, index) => (
        <li
          className={featureFirst && index === 0 ? "grid__item grid__item--wide" : "grid__item"}
          key={place.slug}
        >
          <PlaceCard place={place} featured={featureFirst && index === 0} />
        </li>
      ))}
    </ul>
  );
}
