import type { CountryBlock } from "../data/countryBlocks";
import {
  membershipDisplayName,
  membershipExplainer,
} from "../data/countryBlocks";

/**
 * Membership pill on the country fact-sheet. Hover (pointer) or focus/tap
 * (keyboard & touch) reveals a tooltip with the organisation's full name
 * + abbreviation, a short explainer, when it was created, and when this
 * country joined. CSS :hover / :focus-within — no JS open state — so a
 * tap focuses the button and shows the tip; tapping elsewhere dismisses it.
 */
export function MembershipBadge({
  block,
  countryCode,
  countryName,
}: {
  block: CountryBlock;
  countryCode: string;
  countryName: string;
}) {
  const tipId = `membership-tip-${block.id}-${countryCode}`;
  const title = membershipDisplayName(block);
  const body = membershipExplainer(block, countryCode, countryName);

  return (
    <li className="entity-summary__membership-item">
      <button
        type="button"
        className="entity-summary__membership-btn"
        aria-describedby={tipId}
      >
        {block.label}
      </button>
      <div
        id={tipId}
        role="tooltip"
        className="entity-summary__membership-tip"
      >
        <strong className="entity-summary__membership-tip-title">{title}</strong>
        <p className="entity-summary__membership-tip-body">{body}</p>
      </div>
    </li>
  );
}
