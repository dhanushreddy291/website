import { Combobox } from '@headlessui/react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import ChevronIcon from 'components/pages/partners/apply/images/chevron.inline.svg';
import closeSvg from 'components/pages/partners/apply/images/close.svg';
import Button from 'components/shared/button/button';

const Select = ({ label, selected, setSelected, setQuery, items, multiple = false }) => {
  const onChange = (event) => {
    setQuery(event.target.value);
  };

  const displayValue = (selected) => selected.name;

  return (
    <Combobox
      className="relative"
      value={selected}
      as="div"
      multiple={multiple}
      onChange={setSelected}
    >
      <Combobox.Label>{label}</Combobox.Label>

      <div
        className={clsx('relative mt-3', {
          'flex min-h-[40px] w-full appearance-none rounded border border-transparent bg-white bg-opacity-[0.04] px-4 py-3 caret-transparent transition-colors duration-200 placeholder:text-gray-new-40 hover:border-gray-new-15 focus:border-gray-new-15 focus:outline-none active:border-gray-new-15':
            multiple,
        })}
      >
        {multiple && selected.length > 0 && (
          <ul className="flex flex-wrap gap-x-2 gap-y-1">
            {selected.map((item) => (
              <li
                className="flex items-center gap-x-1 rounded-[20px] bg-green-45 py-[5px] pl-2.5 pr-[7px] font-medium leading-none text-black-new"
                key={item.id}
              >
                <span className="text-sm leading-none">{item.name}</span>
                <Button
                  className="flex h-3.5 w-3.5 items-center"
                  aria-label="Remove"
                  onClick={() =>
                    setSelected(selected.filter((selectedItem) => selectedItem !== item))
                  }
                >
                  <img src={closeSvg} alt="" width={8} height={14} loading="lazy" aria-hidden />
                </Button>
              </li>
            ))}
          </ul>
        )}
        <Combobox.Input
          className={clsx(
            multiple
              ? 'hidden focus:outline-none'
              : 'h-10 w-full appearance-none rounded border border-transparent bg-white bg-opacity-[0.04] px-4 caret-transparent transition-colors duration-200 placeholder:text-gray-new-40 hover:border-gray-new-15 focus:border-gray-new-15 focus:outline-none active:border-gray-new-15'
          )}
          displayValue={multiple ? undefined : displayValue}
          disabled
          onChange={multiple ? undefined : onChange}
        />
        <Combobox.Button
          className={clsx(
            'absolute right-0 top-1/2 mr-4 flex h-full -translate-y-1/2 items-center justify-end',
            multiple && !!selected?.length ? 'w-10' : 'w-full'
          )}
        >
          <ChevronIcon className="h-4 w-4" />
        </Combobox.Button>
      </div>

      <Combobox.Options className="absolute top-full mt-1.5 flex w-full flex-col gap-y-3 rounded border border-gray-new-15 bg-[#1c1d1e] p-4">
        {items.map((item) => (
          <Combobox.Option
            className="cursor-pointer text-sm leading-none transition-colors duration-200 hover:text-green-45 ui-active:text-green-45"
            key={item.id}
            value={item}
            disabled={multiple ? selected.includes(item) : false}
          >
            {item.name}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
};

Select.propTypes = {
  label: PropTypes.string.isRequired,
  selected: PropTypes.oneOfType([
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ),
  ]).isRequired,
  setSelected: PropTypes.func.isRequired,
  setQuery: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  multiple: PropTypes.bool,
};

export default Select;
