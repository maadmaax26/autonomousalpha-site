import { Suspense } from 'react';
import SuccessContent from './SuccessContent';

export const metadata = {
  title: 'Payment Successful | AutonomousAlpha',
  description: 'Thank you for your purchase!',
};

export default function SuccessPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <SuccessContent />
    </Suspense>
  );
}

function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading your order...</p>
      </div>
    </div>
  );
}
