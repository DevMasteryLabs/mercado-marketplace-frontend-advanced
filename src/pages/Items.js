import { useState } from "react";
import DisplayItems from "../components/DisplayItems";

function Items() {
    const [showOnlyOwnItems, setShowOnlyOwnItems] = useState(false)
    return (
        <div>
            <h1>Items</h1>
            <div className="form-check d-flex justify-content-center gap-2">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="showOnlyOwnItems"
                    defaultChecked={showOnlyOwnItems}
                    onClick={e => setShowOnlyOwnItems(e.target.checked)}
                />
                <label
                    className="form-check-label cursor-pointer text-primary"
                    htmlFor="showOnlyOwnItems"
                >
                    Show Only My Items
                </label>
            </div>
            <DisplayItems showOnlyOwnItems={showOnlyOwnItems} />
        </div>
    )
}

export default Items;