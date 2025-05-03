import NavigationOrder from "./NavigationOrder";

export default function Layout({ children }) {
  return (
    <div>
      <NavigationOrder />
      {children}
    </div>
  );
}
