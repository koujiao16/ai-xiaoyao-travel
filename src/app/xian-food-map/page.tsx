import type { Metadata } from 'next';
import FoodGuide from './FoodGuide';
import { restaurants } from './data';
export const metadata: Metadata = {
 title: 'Xi’an Food Map',
 description: `Explore ${restaurants.length} Xiaoyao Travel food picks in Xi’an, with halal options, budgets, local tips and easy navigation.`,
};
export default function XianFoodMapPage() {
 return <main><FoodGuide /></main>;
}
