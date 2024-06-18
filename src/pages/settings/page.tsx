import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SettingsPage = () => {
  return (
    <div className="mx-28 my-16 space-y-4 flex">
      <Tabs defaultValue="user-profile" className="w-[400px] flex-1">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="user-profile">Your profile</TabsTrigger>
          <TabsTrigger value="user-security">Security</TabsTrigger>
        </TabsList>
        <TabsContent value="user-profile">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your profile</CardTitle>
            </CardHeader>
            <CardContent>Coming soon!</CardContent>
            {/* <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-gray-300"></div>
                  <div>
                    <h3 className="text-lg">John Doe</h3>
                    <p className="text-gray-500">
                      <span className="font-semibold">
                        <a href="mailto:" className="text-blue-500"></a>
                      </span>
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg">Change your name</h4>
                  <div className="flex space-x-4">
                    <input
                      type="text"
                      className="input"
                      placeholder="First name"
                    />
                    <input
                      type="text"
                      className="input"
                      placeholder="Last name"
                    />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg">Change your email</h4>
                  <input type="email" className="input" placeholder="Email" />
                </div>
                <div>
                  <h4 className="text-lg">Change your password</h4>
                  <input
                    type="password"
                    className="input"
                    placeholder="Password"
                  />
                </div>
                <div>
                  <button className="btn">Save changes</button>
                </div>
              </div>
            </CardContent> */}
          </Card>
        </TabsContent>
        <TabsContent value="user-security">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Security</CardTitle>
            </CardHeader>
            <CardContent>Coming soon!</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export const Component = SettingsPage;
