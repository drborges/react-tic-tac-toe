import classnames from "classnames"

import "./card.css"

export function Card({ children, scaled = false }) {
  const css = classnames("Card", { scaled })
  return <div className={css}>{children}</div>
}
