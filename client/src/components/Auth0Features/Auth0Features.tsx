import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Unstable_Grid2'
import Auth0BannerSVG from "svg/banners/Auth0";
import { Auth0Feature } from "./components/Auth0Feature/Auth0Feature";


export const Auth0Features: React.FC = () => {
    const featuresList = [
        {
            title: "Auth0 Authentication and Authorization",
            description:
                "Auth0 supports social providers such as Google, Facebook, and Twitter, along with Enterprise providers such as Microsoft Office 365, Google Apps, and Azure. You can also use any OAuth 2.0 Authorization Server.",
            resourceUrl: "https://auth0.com/docs/connections",
            // banner: "/statics/Auth0Banner.png",
            banner: <Auth0BannerSVG width={800} height={310}/>,
        },
        {
            title: "Multi-Factor Authentication",
            description:
                "You can require your users to provide more than one piece of identifying information when logging in. MFA delivers one-time codes to your users via SMS, voice, email, WebAuthn, and push notifications.",
            resourceUrl: "https://auth0.com/docs/multifactor-authentication",
            banner: "https://cdn.auth0.com/blog/hello-auth0/mfa-logo.svg",
        },
        {
            title: "Attack Protection",
            description:
                "Auth0 can detect attacks and stop malicious attempts to access your application such as blocking traffic from certain IPs and displaying CAPTCHA. Auth0 supports the principle of layered protection in security that uses a variety of signals to detect and mitigate attacks.",
            resourceUrl: "https://auth0.com/docs/attack-protection",
            banner: "https://cdn.auth0.com/blog/hello-auth0/advanced-protection-logo.svg",
        },
        {
            title: "Serverless Extensibility",
            description:
                "Actions are functions that allow you to customize the behavior of Auth0. Each action is bound to a specific triggering event on the Auth0 platform. Auth0 invokes the custom code of these Actions when the corresponding triggering event is produced at runtime.",
            resourceUrl: "https://auth0.com/docs/actions",
            banner: "https://cdn.auth0.com/blog/hello-auth0/private-cloud-logo.svg",
        },
    ];
    return (
        <Box
            sx={{
                padding: "3.2rem 4.8rem"
            }}
        >
            <Typography
                variant="h2"
                sx={{
                    textAlign: "center",
                    color: 'white',
                    fontWeight: 600,
                    marginTop: 0,
                    marginBottom: "4.8rem",
                    fontSize: "3.2rem",
                    lineHeight: "4.8rem",
                }}
            >
                Explore Outstanding Features
            </Typography>
            <Grid
                container
                columnSpacing={8}
                rowSpacing={8}
                alignItems="center"
            >
                {featuresList.map((feature) => (
                    <Grid
                        xs={6}
                        key={feature.resourceUrl}
                    >
                        <Auth0Feature
                            title={feature.title}
                            description={feature.description}
                            resourceUrl={feature.resourceUrl}
                            banner={feature.banner}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}