import { Card, CardHeader, CardTitle } from '@/components/ui/card';

const SettingsPage = () => {
  return (
    <div className="mx-28 my-16 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your profile</CardTitle>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Security</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};

export const Component = SettingsPage;
