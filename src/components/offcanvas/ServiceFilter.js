import React from "react";

const ServiceFilter = () => {
  return (
    <div
      className="offcanvas offcanvas-start text-bg-dark"
      tabIndex="-1"
      id="offcanvasFilter"
      aria-labelledby="offcanvasFilterLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasFilterLabel">
          Filter Services
        </h5>
        <button
          type="button"
          className="btn-close btn-close-white"
          data-bs-dismiss="offcanvas"
        ></button>
      </div>
      <div className="offcanvas-body">
        <form>
          <div className="mb-3">
            <label htmlFor="categoryId" className="form-label">
              Category
            </label>
            <select id="categoryId" className="form-select">
              <option value="">All Categories</option>
              <option value="1">Example Category</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="rangeSlider" className="form-label">
              Price Range
            </label>
            <div className="d-flex justify-content-between">
              <span>
                $<span id="minValueLabel">0</span>
              </span>
              <span>
                $<span id="maxValueLabel">500000</span>
              </span>
            </div>
            <input
              type="range"
              className="form-range"
              id="precioMinSlider"
              name="precioMin"
              min="0"
              max="500000"
              step="500"
              defaultValue="0"
              onInput={() => {}}
            />
            <input
              type="range"
              className="form-range mt-2"
              id="precioMaxSlider"
              name="precioMax"
              min="0"
              max="500000"
              step="500"
              defaultValue="500000"
              onInput={() => {}}
            />
          </div>

          <button type="submit" className="btn btn-warning w-100">
            <i className="bi bi-search"></i> Apply Filter
          </button>
        </form>
      </div>
    </div>
  );
};

export default ServiceFilter;
