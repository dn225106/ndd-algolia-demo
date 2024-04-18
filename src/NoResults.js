import { useInstantSearch } from 'react-instantsearch';

export function NoResultsBoundary({ children, fallback }) {
  const { results } = useInstantSearch();

  // The `__isArtificial` flag makes sure not to display the No Results message
  // when no hits have been returned.
  if (!results.__isArtificial && results.nbHits === 0) {
    return (
      <>
        {fallback}
        <div hidden>{children}</div>
      </>
    );
  }

  return children;
}

export function NoResults() {
  const { indexUiState } = useInstantSearch();

  return (
    <div>
      <p>
        <img src={require ("./no-results.png")} alt="No Results"
        width="300" 
        height="300"
        />

        <h2>No results were found. Please modify your search criteria.</h2>
      </p>
    </div>
  );
}