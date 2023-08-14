import React from 'react';

// Should I use interface or type here?
interface Properties {
  useCase: string,
  onClick: () => void;
  //className: string;
}

// Should this be formatted as a constant with <> instead?
// Do I need to include this React.JSX.Element syntax?
export default function Button({useCase, onClick, /*className*/} : Properties)/*: React.JSX.Element*/ {
  return (
    <button /*className={className}*/ onClick={onClick}>
      {useCase}
    </button>
  )
}